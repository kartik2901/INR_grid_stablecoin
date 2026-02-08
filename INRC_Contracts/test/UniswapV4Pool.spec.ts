// import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { expect } from "chai";
// import { ethers } from "hardhat";

// describe("Uniswap V4 Pool Test", function () {
//     // Constants
//     const FEE = 3000;
//     const TICK_SPACING = 60;
//     // If INRC = 18 decimals, USDT = 6 decimals.
//     // 1:1 price means 1 token1 = 1 token0.
//     // If token0 is USDT (6 decimals), token1 is INRC (18 decimals).
//     // Price = 10^18 / 10^6 = 10^12.
//     // sqrtPrice = 10^6.
//     // sqrtPriceX96 = 10^6 * 2^96.
//     // If tokens are reversed:
//     // Price = 10^6 / 10^18 = 10^-12.
//     // sqrtPrice = 10^-6.
//     // sqrtPriceX96 = (2^96) / 10^6.

//     const SQRT_PRICE_X96_1_1 = 79228162514264337593543950336n; // Base 2^96

//     async function deployFixture() {
//         const [owner, otherAccount] = await ethers.getSigners();

//         const INRC = await ethers.getContractFactory("INRC");
//         const inrc = await INRC.deploy();
//         await inrc.initialize(owner.address);
//         // Note: I will check decimals of inrc and usdt dynamically.

//         const Usdt = await ethers.getContractFactory("Usdt");
//         const usdt = await Usdt.deploy();

//         // Deploy PoolManager
//         const PoolManager = await ethers.getContractFactory("PoolManager");
//         const poolManager = await PoolManager.deploy(owner.address);

//         const PoolModifyLiquidityTest = await ethers.getContractFactory("PoolModifyLiquidityTest");
//         const lpRouter = await PoolModifyLiquidityTest.deploy(poolManager.address);

//         const PoolSwapTest = await ethers.getContractFactory("PoolSwapTest");
//         const swapRouter = await PoolSwapTest.deploy(poolManager.address);

//         // Mint lots of tokens to owner (1,000,000,000 units each)
//         // INRC has 18 decimals, Usdt has 6. 
//         // We use the deployed instances which are the actual contracts.
//         await (inrc as any).INRC_ISSUE(owner.address, ethers.utils.parseUnits("1000000000", 18));
//         await (usdt as any).mint(owner.address, ethers.utils.parseUnits("1000000000", 6));

//         // Sort tokens
//         let token0: any, token1: any;
//         if (inrc.address.toLowerCase() < usdt.address.toLowerCase()) {
//             token0 = inrc;
//             token1 = usdt;
//         } else {
//             token0 = usdt;
//             token1 = inrc;
//         }

//         const poolKey = {
//             currency0: token0.address,
//             currency1: token1.address,
//             fee: FEE,
//             tickSpacing: TICK_SPACING,
//             hooks: ethers.constants.AddressZero
//         };

//         // Calculate sqrtPriceX96 based on decimals
//         const d0 = await token0.decimals();
//         const d1 = await token1.decimals();
//         let sqrtPriceX96 = SQRT_PRICE_X96_1_1;

//         if (d0 !== d1) {
//             const diff = Math.abs(d1 - d0);
//             const factor = BigInt(10 ** (diff / 2));
//             if (d1 > d0) {
//                 // token1 has more decimals
//                 sqrtPriceX96 = SQRT_PRICE_X96_1_1 * factor;
//             } else {
//                 // token0 has more decimals
//                 sqrtPriceX96 = SQRT_PRICE_X96_1_1 / factor;
//             }
//         }

//         return { inrc, usdt, poolManager, lpRouter, swapRouter, token0, token1, poolKey, owner, otherAccount, sqrtPriceX96 };
//     }

//     describe("Pool & Initialization", function () {
//         it("Should successfully create and initialize pool", async function () {
//             const { poolManager, poolKey, sqrtPriceX96 } = await loadFixture(deployFixture);
//             console.log("poolKey", poolKey);
//             console.log("sqrtPriceX96", sqrtPriceX96);

//             await expect(poolManager.initialize(poolKey, sqrtPriceX96))
//                 .to.emit(poolManager, "Initialize");
//         });

//         it("Should revert if tokens are passed in wrong order", async function () {
//             const { poolManager, token0, token1, sqrtPriceX96 } = await loadFixture(deployFixture);
//             const wrongPoolKey = {
//                 currency0: token1.address,
//                 currency1: token0.address,
//                 fee: FEE,
//                 tickSpacing: TICK_SPACING,
//                 hooks: ethers.constants.AddressZero
//             };
//             // v4 manager checks currency0 < currency1
//             await expect(poolManager.initialize(wrongPoolKey, sqrtPriceX96))
//                 .to.be.reverted;
//         });
//     });

//     describe("Liquidity Tests", function () {
//         it("Should add and remove liquidity successfully", async function () {
//             const { poolManager, lpRouter, token0, token1, poolKey, sqrtPriceX96, owner } = await loadFixture(deployFixture);
//             await poolManager.initialize(poolKey, sqrtPriceX96);

//             // Approvals - MUST approve poolManager
//             await token0.approve(poolManager.address, ethers.constants.MaxUint256);
//             await token1.approve(poolManager.address, ethers.constants.MaxUint256);

//             // Calculate ticks for the initialized price
//             const d0 = await token0.decimals();
//             const d1 = await token1.decimals();
//             const price = 10 ** (d1 - d0);
//             const midTick = Math.floor(Math.log(price) / Math.log(1.0001));
//             const tickLower = Math.floor((midTick - 600) / TICK_SPACING) * TICK_SPACING;
//             const tickUpper = Math.floor((midTick + 600) / TICK_SPACING) * TICK_SPACING;

//             // Add Liquidity
//             const liquidityDelta = 10n ** 18n;
//             const d0Before = await token0.balanceOf(owner.address);

//             // Using full signature for overloaded function
//             await lpRouter["modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes)"](
//                 poolKey,
//                 {
//                     tickLower,
//                     tickUpper,
//                     liquidityDelta: liquidityDelta,
//                     salt: ethers.utils.formatBytes32String("1")
//                 },
//                 "0x"
//             );

//             const d0AfterAdd = await token0.balanceOf(owner.address);
//             expect(d0AfterAdd).to.be.lt(d0Before);

//             // Remove Remaining Half Liquidity
//             await lpRouter["modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes)"](
//                 poolKey,
//                 {
//                     tickLower,
//                     tickUpper,
//                     liquidityDelta: -liquidityDelta,
//                     salt: ethers.utils.formatBytes32String("1")
//                 },
//                 "0x"
//             );

//             const d0Final = await token0.balanceOf(owner.address);
//             // Should be close to original
//             expect(d0Final).to.be.closeTo(d0Before, ethers.utils.parseUnits("1", d0));
//         });

//         it("Should revert when removing more liquidity than owned", async function () {
//             const { poolManager, lpRouter, token0, token1, poolKey, sqrtPriceX96 } = await loadFixture(deployFixture);
//             await poolManager.initialize(poolKey, sqrtPriceX96);
//             await token0.approve(poolManager.address, ethers.constants.MaxUint256);
//             await token1.approve(poolManager.address, ethers.constants.MaxUint256);

//             const d0 = await token0.decimals();
//             const d1 = await token1.decimals();
//             const price = 10 ** (d1 - d0);
//             const midTick = Math.floor(Math.log(price) / Math.log(1.0001));
//             const tickLower = Math.floor((midTick - 60) / TICK_SPACING) * TICK_SPACING;
//             const tickUpper = Math.floor((midTick + 60) / TICK_SPACING) * TICK_SPACING;

//             await lpRouter["modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes)"](
//                 poolKey,
//                 {
//                     tickLower,
//                     tickUpper,
//                     liquidityDelta: 1000n,
//                     salt: ethers.utils.formatBytes32String("2")
//                 },
//                 "0x"
//             );

//             await expect(lpRouter["modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes)"](
//                 poolKey,
//                 {
//                     tickLower,
//                     tickUpper,
//                     liquidityDelta: -2000n,
//                     salt: ethers.utils.formatBytes32String("2")
//                 },
//                 "0x"
//             )).to.be.reverted;
//         });
//     });

//     describe("Swap Tests", function () {
//         it("Should swap tokens successfully", async function () {
//             const { poolManager, lpRouter, swapRouter, token0, token1, poolKey, sqrtPriceX96, owner } = await loadFixture(deployFixture);
//             await poolManager.initialize(poolKey, sqrtPriceX96);

//             const d0 = await token0.decimals();
//             const d1 = await token1.decimals();
//             const price = 10 ** (d1 - d0);
//             const midTick = Math.floor(Math.log(price) / Math.log(1.0001));
//             const tickLower = Math.floor((midTick - 1200) / TICK_SPACING) * TICK_SPACING;
//             const tickUpper = Math.floor((midTick + 1200) / TICK_SPACING) * TICK_SPACING;

//             // Add liquidity first
//             await token0.approve(poolManager.address, ethers.constants.MaxUint256);
//             await token1.approve(poolManager.address, ethers.constants.MaxUint256);
//             await lpRouter["modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes)"](
//                 poolKey,
//                 {
//                     tickLower,
//                     tickUpper,
//                     liquidityDelta: 10n ** 18n,
//                     salt: ethers.utils.formatBytes32String("swap-test")
//                 },
//                 "0x"
//             );

//             // Swap tokens (exact input)
//             const amountToSwap = 10n ** BigInt(d0); // 1.0 unit
//             await token0.approve(poolManager.address, ethers.constants.MaxUint256);

//             const b1Before = await token1.balanceOf(owner.address);

//             // swap(PoolKey memory key, SwapParams memory params, TestSettings memory testSettings, bytes memory hookData)
//             await swapRouter.swap(
//                 poolKey,
//                 {
//                     zeroForOne: true,
//                     amountSpecified: -BigInt(amountToSwap), // negative for exact input
//                     sqrtPriceLimitX96: BigInt(sqrtPriceX96) - (BigInt(sqrtPriceX96) / 100n) // 1% price impact limit
//                 },
//                 { takeClaims: false, settleUsingBurn: false },
//                 "0x"
//             );

//             const b1After = await token1.balanceOf(owner.address);
//             expect(b1After).to.be.gt(b1Before);
//         });
//     });
// });



import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

/* ============================================================
   Constants
============================================================ */

const FEE = 3000;
const TICK_SPACING = 60;
const Q96 = 2n ** 96n;
const MIN_SQRT_PRICE = 4295128739n;
const MAX_SQRT_PRICE = 1461446703485210103287273052203988822378723970342n;

/* ============================================================
   Helpers
============================================================ */

function sqrtBigInt(value: bigint): bigint {
    if (value < 0n) throw new Error("negative");
    if (value < 2n) return value;

    let x0 = value / 2n;
    let x1 = (x0 + value / x0) / 2n;

    while (x1 < x0) {
        x0 = x1;
        x1 = (x0 + value / x0) / 2n;
    }

    return x0;
}

/* ============================================================
   Test Suite
============================================================ */

describe("Uniswap V4 Pool Test", function () {

    async function deployFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        /* ---------------- Tokens ---------------- */

        const INRC = await ethers.getContractFactory("INRC");
        const inrc = await INRC.deploy();
        await inrc.initialize(owner.address);

        const Usdt = await ethers.getContractFactory("Usdt");
        const usdt = await Usdt.deploy();

        /* ---------------- PoolManager ---------------- */

        const PoolManager = await ethers.getContractFactory("PoolManager");
        const poolManager = await PoolManager.deploy(owner.address);

        /* ---------------- Routers ---------------- */

        const PoolModifyLiquidityTest =
            await ethers.getContractFactory("PoolModifyLiquidityTest");
        const lpRouter =
            await PoolModifyLiquidityTest.deploy(poolManager.address);

        const PoolSwapTest =
            await ethers.getContractFactory("PoolSwapTest");
        const swapRouter =
            await PoolSwapTest.deploy(poolManager.address);

        /* ---------------- Mint Tokens ---------------- */

        await (inrc as any).INRC_ISSUE(
            owner.address,
            ethers.utils.parseUnits("1000000000", 18)
        );

        await (usdt as any).mint(
            owner.address,
            ethers.utils.parseUnits("1000000000", 6)
        );

        /* ---------------- Token Ordering ---------------- */

        let token0: any, token1: any;
        if (inrc.address.toLowerCase() < usdt.address.toLowerCase()) {
            token0 = inrc;
            token1 = usdt;
        } else {
            token0 = usdt;
            token1 = inrc;
        }

        /* ---------------- PoolKey ---------------- */

        const poolKey = {
            currency0: token0.address,
            currency1: token1.address,
            fee: FEE,
            tickSpacing: TICK_SPACING,
            hooks: ethers.constants.AddressZero
        };

        /* ---------------- sqrtPriceX96 ----------------
           1:1 human price adjusted for decimals
        ------------------------------------------------ */

        const d0 = await token0.decimals();
        const d1 = await token1.decimals();

        let sqrtPriceX96: bigint;

        if (d1 >= d0) {
            // price = 10^(d1 - d0)
            const price = 10n ** BigInt(d1 - d0);
            sqrtPriceX96 = sqrtBigInt(price) * Q96;
        } else {
            // price = 1 / 10^(d0 - d1)
            const price = 10n ** BigInt(d0 - d1);
            sqrtPriceX96 = Q96 / sqrtBigInt(price);
        }

        return {
            owner,
            otherAccount,
            token0,
            token1,
            poolManager,
            lpRouter,
            swapRouter,
            poolKey,
            sqrtPriceX96
        };
    }

    /* ============================================================
       Pool Initialization
    ============================================================ */

    describe("Pool & Initialization", function () {

        it("Creates and initializes pool", async function () {
            const { poolManager, poolKey, sqrtPriceX96 } =
                await loadFixture(deployFixture);

            await expect(
                poolManager.initialize(poolKey, sqrtPriceX96)
            ).to.emit(poolManager, "Initialize");
        });

        it("Reverts if tokens are passed in wrong order", async function () {
            const { poolManager, token0, token1, sqrtPriceX96 } =
                await loadFixture(deployFixture);

            const wrongPoolKey = {
                currency0: token1.address,
                currency1: token0.address,
                fee: FEE,
                tickSpacing: TICK_SPACING,
                hooks: ethers.constants.AddressZero
            };

            await expect(
                poolManager.initialize(wrongPoolKey, sqrtPriceX96)
            ).to.be.reverted;
        });
    });

    /* ============================================================
       Liquidity Tests
    ============================================================ */

    describe("Liquidity Tests", function () {

        // it("Adds and removes liquidity successfully", async function () {
        //     const {
        //         owner,
        //         token0,
        //         token1,
        //         poolManager,
        //         lpRouter,
        //         poolKey,
        //         sqrtPriceX96
        //     } = await loadFixture(deployFixture);

        //     await poolManager.initialize(poolKey, sqrtPriceX96);
        //     console.log("the pool got initialized");


        //     await token0.approve(lpRouter.address, ethers.constants.MaxUint256);
        //     await token1.approve(lpRouter.address, ethers.constants.MaxUint256);

        //     console.log("Arppoval is happenning");

        //     const tickLower = -600;
        //     const tickUpper = 600;
        //     const liquidityDelta = 10n ** 24n;

        //     const balanceBefore = await token0.balanceOf(owner.address);

        //     console.log("lp router is called ?");

        //     console.log("lp router is called ", lpRouter)
        //     await lpRouter[
        //         "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes)"
        //     ](
        //         poolKey,
        //         {
        //             tickLower,
        //             tickUpper,
        //             liquidityDelta,
        //             salt: ethers.utils.formatBytes32String("LP")
        //         },
        //         "0x"
        //     );

        //     console.log("lp router call complete");

        //     const balanceAfterAdd = await token0.balanceOf(owner.address);
        //     expect(balanceAfterAdd).to.be.lt(balanceBefore);

        //     // await lpRouter[
        //     //     "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes)"
        //     // ](
        //     //     poolKey,
        //     //     {
        //     //         tickLower,
        //     //         tickUpper,
        //     //         liquidityDelta: -liquidityDelta,
        //     //         salt: ethers.utils.formatBytes32String("LP")
        //     //     },
        //     //     "0x"
        //     // );

        //     // const balanceAfterRemove = await token0.balanceOf(owner.address);
        //     // expect(balanceAfterRemove).to.be.closeTo(
        //     //     balanceBefore,
        //     //     ethers.utils.parseUnits("1", await token0.decimals())
        //     // );
        // });


        //         it("Adds and removes liquidity successfully", async function () {
        //     const {
        //         owner,
        //         token0,
        //         token1,
        //         poolManager,
        //         lpRouter,
        //         poolKey,
        //         sqrtPriceX96
        //     } = await loadFixture(deployFixture);

        //     // 1. Initialize pool
        //     await poolManager.initialize(poolKey, sqrtPriceX96);

        //     // 2. Approve ROUTER (not PoolManager)
        //     await token0.approve(lpRouter.address, ethers.constants.MaxUint256);
        //     await token1.approve(lpRouter.address, ethers.constants.MaxUint256);

        //     // 3. Valid ticks
        //     const spacing = poolKey.tickSpacing;
        //     const tickLower = Math.floor(-600 / spacing) * spacing;
        //     const tickUpper = Math.floor(600 / spacing) * spacing;

        //     // 4. Reasonable liquidity
        //     const liquidityDelta = ethers.utils.parseUnits("1000", 18);

        //     const balanceBefore = await token0.balanceOf(owner.address);

        //     // 5. Add liquidity
        //     await lpRouter[
        //         "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes,bool,bool)"
        //     ](
        //         poolKey,
        //         {
        //             tickLower,
        //             tickUpper,
        //             liquidityDelta,
        //             salt: ethers.utils.formatBytes32String("1242")
        //         },
        //         "0x",
        //         false, // settleUsingTransfer
        //         false  // takeClaims
        //     );

        //     const balanceAfterAdd = await token0.balanceOf(owner.address);
        //     expect(balanceAfterAdd).to.be.lt(balanceBefore);

        //     // 6. Remove liquidity
        //     await lpRouter[
        //         "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes,bool,bool)"
        //     ](
        //         poolKey,
        //         {
        //             tickLower,
        //             tickUpper,
        //             liquidityDelta: -liquidityDelta,
        //             salt: ethers.utils.formatBytes32String("1242")
        //         },
        //         "0x",
        //         false,
        //         false
        //     );

        //     const balanceAfterRemove = await token0.balanceOf(owner.address);
        //     expect(balanceAfterRemove).to.be.gt(balanceAfterAdd);
        // });


        it("Adds and removes liquidity successfully", async function () {
            const {
                owner,
                token0,
                token1,
                poolManager,
                lpRouter,
                poolKey,
                sqrtPriceX96
            } = await loadFixture(deployFixture);

            // 1. Initialize pool
            await poolManager.initialize(poolKey, sqrtPriceX96);

            // 2. Approve ROUTER and PoolManager
            await token0.approve(lpRouter.address, ethers.constants.MaxUint256);
            await token1.approve(lpRouter.address, ethers.constants.MaxUint256);
            await token0.approve(poolManager.address, ethers.constants.MaxUint256);
            await token1.approve(poolManager.address, ethers.constants.MaxUint256);

            // 3. Ticks aligned to spacing
            const spacing = poolKey.tickSpacing;
            const tickLower = Math.floor(-600 / spacing) * spacing;
            const tickUpper = Math.floor(600 / spacing) * spacing;

            // 4. Liquidity
            const liquidityDelta = ethers.utils.parseUnits("1000", 18);

            const balanceBefore = await token0.balanceOf(owner.address);

            // 5. ADD liquidity ✅
            await lpRouter[
                "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes,bool,bool)"
            ](
                poolKey,
                {
                    tickLower,
                    tickUpper,
                    liquidityDelta,
                    salt: ethers.utils.formatBytes32String("LP")
                },
                "0x",
                false,  // settleUsingBurn: false (use transfer)
                false   // takeClaims: false
            );

            const balanceAfterAdd = await token0.balanceOf(owner.address);
            expect(balanceAfterAdd).to.be.lt(balanceBefore);

            // 6. REMOVE liquidity ✅
            await lpRouter[
                "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes,bool,bool)"
            ](
                poolKey,
                {
                    tickLower,
                    tickUpper,
                    liquidityDelta: liquidityDelta.mul(-1),
                    salt: ethers.utils.formatBytes32String("LP")
                },
                "0x",
                false,  // settleUsingBurn: false (use transfer)
                false   // takeClaims: false
            );

            const balanceAfterRemove = await token0.balanceOf(owner.address);
            expect(balanceAfterRemove).to.be.gt(balanceAfterAdd);
        });

        it("Reverts when removing more liquidity than owned", async function () {
            const {
                token0,
                token1,
                poolManager,
                lpRouter,
                poolKey,
                sqrtPriceX96
            } = await loadFixture(deployFixture);

            await poolManager.initialize(poolKey, sqrtPriceX96);

            await token0.approve(poolManager.address, ethers.constants.MaxUint256);
            await token1.approve(poolManager.address, ethers.constants.MaxUint256);
            await token0.approve(lpRouter.address, ethers.constants.MaxUint256);
            await token1.approve(lpRouter.address, ethers.constants.MaxUint256);

            const spacing = poolKey.tickSpacing;
            const tickLower = Math.floor(-60 / spacing) * spacing;
            const tickUpper = Math.floor(60 / spacing) * spacing;

            await lpRouter[
                "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes,bool,bool)"
            ](
                poolKey,
                {
                    tickLower,
                    tickUpper,
                    liquidityDelta: 10n ** 24n,
                    salt: ethers.utils.formatBytes32String("FAIL")
                },
                "0x",
                false,
                false
            );

            await expect(
                lpRouter[
                    "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes,bool,bool)"
                ](
                    poolKey,
                    {
                        tickLower,
                        tickUpper,
                        liquidityDelta: -(10n ** 25n),
                        salt: ethers.utils.formatBytes32String("FAIL")
                    },
                    "0x",
                    false,
                    false
                )
            ).to.be.reverted;
        });
    });

    /* ============================================================
       Swap Tests
    ============================================================ */

    describe("Swap Tests", function () {

        it("Swaps token0 → token1 successfully", async function () {
            const {
                owner,
                token0,
                token1,
                poolManager,
                lpRouter,
                swapRouter,
                poolKey,
                sqrtPriceX96
            } = await loadFixture(deployFixture);

            await poolManager.initialize(poolKey, sqrtPriceX96);

            await token0.approve(poolManager.address, ethers.constants.MaxUint256);
            await token1.approve(poolManager.address, ethers.constants.MaxUint256);
            await token0.approve(lpRouter.address, ethers.constants.MaxUint256);
            await token1.approve(lpRouter.address, ethers.constants.MaxUint256);

            const spacing = poolKey.tickSpacing;
            await lpRouter[
                "modifyLiquidity((address,address,uint24,int24,address),(int24,int24,int256,bytes32),bytes,bool,bool)"
            ](
                poolKey,
                {
                    tickLower: Math.floor(-1200 / spacing) * spacing,
                    tickUpper: Math.floor(1200 / spacing) * spacing,
                    liquidityDelta: 10n ** 24n,
                    salt: ethers.utils.formatBytes32String("SWAP")
                },
                "0x",
                false,
                false
            );

            const balanceBefore = await token1.balanceOf(owner.address);

            await swapRouter.swap(
                poolKey,
                {
                    zeroForOne: true,
                    amountSpecified: -(10n ** BigInt(await token0.decimals())),
                    sqrtPriceLimitX96: MIN_SQRT_PRICE + 1n
                },
                { takeClaims: false, settleUsingBurn: false },
                "0x"
            );

            const balanceAfter = await token1.balanceOf(owner.address);
            expect(balanceAfter).to.be.gt(balanceBefore);
        });
    });
});

