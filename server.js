import './env.js';
import chalk from 'chalk';

import app from './src/app.js';



app.listen(PORT, err => {
    console.log(chalk.blue(`Server listening on port: ${PORT}`));
});