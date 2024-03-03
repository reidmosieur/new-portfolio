type Actions = {
    content: string;
    onClick?: () => void;
    buttonType?: 'primary' |'secondary' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    type?: 'button' |'submit' |'reset';
    submitting?: boolean;
}

export type { Actions };