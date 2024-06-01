import css from '../ErrorMessage/ErrorMessage.module.css';
import React from 'react';

const ErrorMessage: React.FC = () =>  {
    return (
      <div className={css.message}>
        <p>Sorry, something went wrong!<br/>
        Please try again later!
        </p>
      </div>
    )
  }

  export default ErrorMessage;