import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update } from 'firebase/database';

export const defaultState = {
  missionName: 'Operation Alpha',
  missionType: 'Capture the Flag',
  missionText: 'Find flaget, bring det tilbage til jeres base og beskyt holdet.',
  rules: ['Briller på - altid', 'Ingen skud på meget kort afstand', 'Respektér dommeren', 'Fair play giver den bedste oplevelse'],
  redTeam: 'RØD HOLD',
  blueTeam: 'BLÅ HOLD',
  redScore: 0,
  blueScore: 0,
  duration: 480,
  remaining: 480,
  status: 'READY',
  endsAt: null,
  cameraRedUrl: '',
  cameraBlueUrl: '',
  cameraOverviewUrl: '',
  mapUrl: '',
  message: 'Gør jer klar. Næste mission starter snart.',
  events: [],
  soundEvent: { type: 'none', at: 0 }
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const missing = ['apiKey','authDomain','databaseURL','projectId','appId'].filter((key) => !firebaseConfig[key]);
const hasFirebase = missing.length === 0;

let db = null;
let stateRef = null;

if (hasFirebase) {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  stateRef = ref(db, 'missionControl/state');
} else {
  console.warn('Firebase env mangler. App kører i lokal fallback-mode.', missing);
}

const localKey = 'vgb-mission-control-state';
const localListeners = new Set();

function readLocal() {
  try {
    return { ...defaultState, ...(JSON.parse(localStorage.getItem(localKey)) || {}) };
  } catch {
    return defaultState;
  }
}

function writeLocal(next) {
  localStorage.setItem(localKey, JSON.stringify(next));
  localListeners.forEach((cb) => cb(next));
}

export function subscribeState(callback) {
  if (!hasFirebase) {
    const current = readLocal();
    callback(current);
    localListeners.add(callback);
    return () => localListeners.delete(callback);
  }

  return onValue(stateRef, (snapshot) => {
    const value = snapshot.val();
    if (!value) {
      set(stateRef, defaultState);
      callback(defaultState);
    } else {
      callback({ ...defaultState, ...value });
    }
  });
}

export function patchState(patch) {
  if (!hasFirebase) {
    writeLocal({ ...readLocal(), ...patch });
    return Promise.resolve();
  }
  return update(stateRef, patch);
}

export function resetState() {
  if (!hasFirebase) {
    writeLocal(defaultState);
    return Promise.resolve();
  }
  return set(stateRef, defaultState);
}
