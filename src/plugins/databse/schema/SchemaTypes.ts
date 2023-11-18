export interface ISelectOptions {
    [key: string]: string | number;
    [key: number]: string | number;
}

export interface ISchema {
    type: "text" | "string" | "checkbox" | "number" | "grid" | "multiFiles" | "select" | "textarea" | "email" | "date" | "password" | "checkbox";
    width: number;
    order: number;
    browserColumn: boolean;
    api?: string;
    grid?: ISchema;
    mask?: string | string[];
    options?: Array<string> | ISelectOptions;
    default?: string | number;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    regex?: string;
}

export interface IsSchemaSelect extends ISchema {
    type: "select"; // Apenas quando o type for "select", a propriedade api será obrigatória
    api: string;
}


export interface IGlobals {
    $GLOBALS: {
        icon_name: string,
        plural_name: string,
        singular_name: string;
        fields: Record<string, ISchema>
    }
}