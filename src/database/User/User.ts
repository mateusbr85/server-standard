export class User {
    static async onValidate(data: Array<Record<string,unknown>>) {
        try {
            return 'teste'
        }catch(e:any) {
            throw new Error(e)
        }
    }
    static async onSave() {
        try {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')
            return 'teste'
        }catch(e) {
            return e
        }
    }
}