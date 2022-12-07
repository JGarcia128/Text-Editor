import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Adding logic to a method 
export const putDb = async (content)  => {
  console.log('PUT to the database');

  // Creating a connection to the database database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Creating a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log(' data saved to the database', result);
};

//Adding logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Creating a connection to the database database 
  const contactDb = await openDB('jate', 1);

  // Creating a new transaction and specify the database and data privileges
  const tx = contactDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  const res = await req;
  console.log('data saved to the jateDB', res);  
};

initdb();
