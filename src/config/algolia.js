import { algoliasearch } from "algoliasearch";

const appID = "X1APVMR84N";
const apiKey = "a0813d4b4d3c9b7a17c63ac0208adc4a";

const client = algoliasearch(appID, apiKey);

export default client