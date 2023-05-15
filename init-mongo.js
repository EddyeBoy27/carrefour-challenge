db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    { role: 'readAnyDatabase', db: 'admin' },
    { role: 'dbAdminAnyDatabase', db: 'admin' },
    { role: 'userAdminAnyDatabase', db: 'admin' },
  ],
});
