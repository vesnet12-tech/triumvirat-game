fetch('http://localhost:3000/api/god/give-money', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ charId: 'maru123', amount: 100 })
}).then(res => res.json()).then(console.log).catch(console.error);
