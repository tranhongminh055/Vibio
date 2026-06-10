(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'jonathan', password: '123456' })
    });
    console.log('STATUS', res.status);
    const text = await res.text();
    console.log('BODY:', text);
  } catch (e) {
    console.error('ERROR:', e);
  }
})();
