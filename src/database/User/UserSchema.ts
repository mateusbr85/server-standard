import { IGlobals } from "@plugins/databse/schema/SchemaTypes"

const UserSchema = {
    $GLOBALS: {
        icon_name: 'fa fa-folder',
        plural_name: 'Usuarios',
        singular_name: 'Usuario',
        fields: {
            user_text_name: {
                type: 'text',
                browserColumn: true,
                order: 1,
                width: 3,
                required: true,
                readonly: false,
                label: 'Nome',
            },
            user_email: {
                type: 'email',
                browserColumn: true,
                order: 2,
                width: 3,
                required: true,
                label: 'Email do Usuario'
            },
            user_password: {
                type: 'password',
                browserColumn: false,
                order: 3,
                width: 2,
                min:6,
                max: 8,
                required: true,
                label: 'Senha'
            },
            user_fk_user_type_id: {
                type: "select",
                browserColumn: false,
                order: 4,
                width: 2,
                label: 'Tipo de Usuário',
                api: 'type_users'
            },
            user_active: {
                type: 'checkbox',
                browserColumn: true,
                order: 5,
                width: 2,
                label: 'Ativo?',
                required: true
            },
            user_cell: {
                type: 'text',
                browserColumn: true,
                order: 6,
                width: 2,
                label: 'Celular',
                required: true
            }
            
        }
    }
} as IGlobals

export { UserSchema }
