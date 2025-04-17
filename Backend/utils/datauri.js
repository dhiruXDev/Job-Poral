import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    console.log("orini",file)
    const parser = new DataUriParser();console.log("parser",parser)
    const extName = path.extname(file.originalname).toString(); console.log("extname",extName)
    return parser.format(extName, file.buffer);
}

export default getDataUri;