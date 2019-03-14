// DI.js
import feathers from "@feathersjs/client";
import localstorage from 'feathers-localstorage/dist/feathers-localstorage';


const storage = {};
const parentReelMasterServiceApp = feathers().use('/parentReelMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'parentReelMaster' }));

const deliveryMasterServiceApp = feathers().use('/deliveryMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'deliveryMaster' }));
const productMasterServiceApp = feathers().use('/productMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'productMaster' }));

const reelMasterServiceApp = feathers().use('/reelMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'reelMaster' }));
const packageMasterServiceApp = feathers().use('/packageMaster', localstorage({ storage: window.localStorage, id: '_id', startId: 0, name: 'packageMaster' }));

const parentReelMasterService = parentReelMasterServiceApp.service('parentReelMaster');
const deliveryMasterService = deliveryMasterServiceApp.service('deliveryMaster');
const productMasterService = productMasterServiceApp.service('productMaster');
const reelMasterService = reelMasterServiceApp.service('reelMaster');
const packageMasterService = packageMasterServiceApp.service('packageMaster');

storage['parentReelMaster'] = parentReelMasterService;
storage['deliveryMaster'] = deliveryMasterService;
storage['productMaster'] = productMasterService;
storage['reelMaster'] = reelMasterService;
storage['packageMaster'] = packageMasterService;

export function get(key) {
    return storage[key];
}
