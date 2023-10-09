'use strict';
// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);
// require('dotenv').config();
// https://www.npmjs.com/package/dotenv
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {


};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);


export {database};
