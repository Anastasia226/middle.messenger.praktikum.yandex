export type FieldReg = {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    validation: {
        regex: RegExp,
        messageError: string;
    };
}