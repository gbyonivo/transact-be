import definitions from './definitions';
import queries from './queries';
import mutations from './mutations';

const typeDefinitions = `
    ${definitions}
    ${queries}
    ${mutations}
    schema {
        query: Query,
        mutation: Mutation
    }
`;

// console.log(typeDefinitions);

export default [typeDefinitions];