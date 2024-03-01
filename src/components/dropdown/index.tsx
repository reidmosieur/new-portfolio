type DropdownOptionObject = {
    name: string;
    value: string;
}

type DropdownProps = {
    options: Array<string> | Array<DropdownOptionObject> | undefined;
    value?: string | DropdownOptionObject;
    className?: string;
    optionTemplate?: (option: string | DropdownOptionObject | undefined) => JSX.Element;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
}

type BasicOptionTemplateProps = {
    option: string | DropdownOptionObject | undefined;
}

const BasicOptionTemplate = ({
    option,
}: BasicOptionTemplateProps) => {
    return (
        <option
            className="px-2 py-1"
            value={typeof option ==='string'? option : option?.value}
        >
            {typeof option ==='string'? option : option?.name}
        </option>
    )
}

const Dropdown = ({
    options,
    value,
    className,
    optionTemplate,
    onChange,
    disabled,
}: DropdownProps) => {
    return (
        <select
            className={`${className || ''}`}
            onChange={onChange}
            value={typeof value === 'string' ? value : value?.value}
            disabled={disabled}
        >
            {options?.map((option, index) => {
                if (optionTemplate) {
                    return (
                        optionTemplate(option)
                    )
                } else {
                    return (
                        <BasicOptionTemplate
                            option={option}
                        />
                    )
                }
            })}
        </select>
    )
}

export default Dropdown;