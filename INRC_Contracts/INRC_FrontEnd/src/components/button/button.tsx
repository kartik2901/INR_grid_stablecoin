import { TButton } from '@/types/_types';
import { Spinner } from 'react-bootstrap';

const Button = (props: TButton) => {
    const { text, children, type, loading, className, fluid, ...rest } = props;
    return (
        <button
            {...rest}
            type={type || "button"}
            className={`${className ?? ""} custom_btn ${fluid ? "w-100" : ""}`}
        >
            {
                (loading) ?
                    <Spinner />
                    :
                    text ??
                    children
            }
        </button>
    )
}

export default Button
