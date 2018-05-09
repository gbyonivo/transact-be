import definitions from './definitions';
import queries from './queries';

const typeDefinitions = `
    ${definitions}
    ${queries}
    schema {
        query: Query
    }
`;

// console.log(typeDefinitions);

export default [typeDefinitions];