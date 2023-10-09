'use strict';


// https://firebase.google.com/docs/admin/setup?authuser=0
import {initializeApp,cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { createRequire } from 'module'
const require = createRequire(import.meta.url);



const defaultApp = initializeApp({

});

const auth = getAuth();

export {auth};
