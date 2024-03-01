type Actions = {
    content: string;
    onClick: () => void;
    buttonType?: 'primary' |'secondary' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

export type { Actions };