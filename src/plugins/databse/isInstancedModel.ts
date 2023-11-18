import _ from "lodash";
import pluralize from "pluralize";
interface InstancedModel {
    onValidate: (data: Array<Record<string,unknown>>) => Promise<{isValid: boolean, errors?: Record<string,any>}>;
    onSave: () => Promise<any>;
    onDelete: () => Promise<any>;
    // Adicione outros métodos, se necessário
}

export class IsInstancedModel {
    static async instanced(crudName: string): Promise<InstancedModel> {
        try {
            const instancedName = _.startCase(
                _.camelCase(
                    pluralize.singular(
                        crudName
                            .split("-")
                            .join("_")
                            .split("_")
                            .map((item: string) => pluralize.singular(item))
                            .join("_"),
                    ),
                ),
            ).split(" ").join("");
            const instancedModule = await import(`@src/database/${instancedName}/${instancedName}`);
            return instancedModule[instancedName]
        } catch (e: any) {
            throw new Error(e)
        }
    }
}