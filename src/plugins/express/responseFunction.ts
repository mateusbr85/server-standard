import { Response } from "express";

export const response = async (value: any, res: Response, message = "Realizado com Sucesso", messageErro = 'Sem resultados'): Promise<Response> => {
    if(![undefined,null].includes(value)){
        return res.status(200).json({response:value, message:message});

    }else{
        return res.status(203).json({message: messageErro})

    }
    // if(value !== null || value > 0 || value !== undefined) {
    //     console.log('entrei aqui ')
    // }else { 
    // }
}
