// DI.js
import feathers from "@feathersjs/client";
import localstorage from 'feathers-localstorage/dist/feathers-localstorage';


const storage = {};
const parentReelMasterServiceApp = feathers().use('/parentReelMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'parentReelMaster' }));
const reelMasterServiceApp = feathers().use('/reelMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'reelMaster' }));

const parentReelMasterService = parentReelMasterServiceApp.service('parentReelMaster');
const reelMasterService = reelMasterServiceApp.service('reelMaster');

storage['parentReelMaster'] = parentReelMasterService;
storage['reelMaster'] = reelMasterService;

export function get(key) {
    return storage[key];
}
