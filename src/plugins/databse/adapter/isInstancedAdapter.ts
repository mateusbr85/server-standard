import fs from 'node:fs'
import path from 'path'
import { isAdapterEvents } from './isAdapterEvents';

export interface isInstancedAdapterProps {
    instanced(): Promise<Array<isAdapterEvents>>
}


export class isInstancedAdapter implements isInstancedAdapterProps {
    async instanced() {
        const filePath = path.join(__dirname,'../../../database')
        const fsRead = fs.readdirSync(filePath);
        const isPortsDynamics: Array<isAdapterEvents> = []
        for(const folder of fsRead){
            if(folder !== 'migrations'){
                const isModuleImport = await import(`@src/database/${folder}/${folder}Router`);
                const isInstancedClass: isAdapterEvents = new isModuleImport[`${folder}Router`]()
                isPortsDynamics.push(
                    isInstancedClass
                )
            }
        }
        return isPortsDynamics
    }
}