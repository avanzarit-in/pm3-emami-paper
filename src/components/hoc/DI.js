// DI.js
import feathers from "@feathersjs/client";
import localstorage from 'feathers-localstorage/dist/feathers-localstorage';


const storage = {};
const parentReelMasterServiceApp = feathers().use('/parentReelMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'parentReelMaster' }));
const reelMasterServiceApp = feathers().use('/reelMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'reelMaster' }));
const packageMasterServiceApp = feathers().use('/packageMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'packageMaster' }));

const parentReelMasterService = parentReelMasterServiceApp.service('parentReelMaster');
const reelMasterService = reelMasterServiceApp.service('reelMaster');
const packageMasterService = packageMasterServiceApp.service('packageMaster');

storage['parentReelMaster'] = parentReelMasterService;
storage['reelMaster'] = reelMasterService;
storage['packageMaster'] = packageMasterService;

export function get(key) {
    return storage[key];
}
