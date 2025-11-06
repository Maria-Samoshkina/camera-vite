import { Link } from 'react-router-dom';

function NotFoundPage ():JSX.Element {
  return (

    <div className="wrapper">

      <main>

        <div className="page__not-found-container container">
          <section className="not-found">
            <h1>404 Not Found
            </h1>
            <Link to="/">Вернуться на главную</Link>
          </section>

        </div>

      </main>

    </div>

  );
}

export default NotFoundPage;
