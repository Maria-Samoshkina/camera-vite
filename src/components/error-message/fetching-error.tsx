function FetchingError () : JSX.Element {
  return (
    <div style={{textAlign: 'center'}}>
      <h2>Сервер не доступен :(</h2>
      <p>Попробуйте обновить страницу или зайти позже.</p>
    </div>
  );

}

export default FetchingError;
