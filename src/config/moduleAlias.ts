import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..',);

moduleAlias.addAliases({
    '@src': path.join(files,'src'),
    '@models': path.join(files,'src/database/models'),
    '@controllers': path.join(files, 'src/app/http/controllers'),
    '@apis': path.join(files,'src/http/controllers/apis'),
    "@plugins": path.join(files, 'src/plugins'),
    "@http": path.join(files, 'src/app/http')
})