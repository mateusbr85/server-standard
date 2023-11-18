export const getAtualDate = (format: string) => {

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() +1 <= 9 ? `0${date.getMonth() +1}` : date.getMonth() +1;
    const year = date.getFullYear();
    const hour = date.getHours() <= 9 ? `0${date.getHours() +1}` : date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    let atualDate = '';
    switch (format) {
        case 'br':
            atualDate = `${day}/${month}/${year}`;
        break;
        case 'br-hour':
            atualDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        break;
        case 'db':
            atualDate = `${year}-${month}-${day}`;
        break;
        case 'db-hour':
            atualDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        break;
        default:
            return '';
        break;
    }
    return atualDate;
}