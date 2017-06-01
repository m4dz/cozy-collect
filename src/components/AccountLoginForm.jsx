import styles from '../styles/accountLoginForm'

import React from 'react'
import classNames from 'classnames'
import statefulForm from '../lib/statefulForm'
import Field, { PasswordField, DropdownField, CheckboxField } from './Field'

const AccountLoginForm = ({ t, isOAuth, customView, fields, error, dirty, submitting, forceEnabled, deleting, values, submit, onDelete, onCancel }) => {
  const isUpdate = !!values.login || !!values.access_token
  const submitEnabled = dirty || isOAuth || forceEnabled
  return (
    <div className={styles['account-form-login']}>
      {customView &&
        <div className='coz-custom-view'
          dangerouslySetInnerHTML={{
            __html: customView.replace(/<%t (.*) %>/gi, (match, $1) => t($1))
          }} />
      }
      {Object.keys(fields)
        .filter(name => !fields[name].advanced)
        .map(name => {
          if (fields[name].type === 'password') {
            return <PasswordField
              label={t(name)}
              placeholder={t('account.connection.login.password.placeholder')}
              invalid={!!error}
              {...fields[name]} />
          }
          if (fields[name].type === 'dropdown') {
            return <DropdownField label={t(name)} {...fields[name]} />
          }

          if (fields[name].type === 'checkbox') {
            return <CheckboxField label={t(name)} {...fields[name]} />
          }

          const readOnly = name === 'login' && isUpdate

          return <Field
            label={t(name)}
            readOnly={readOnly}
            invalid={!!error}
            {...fields[name]} />
        }
      )}
      {isUpdate &&
        <div className={styles['col-account-form-delete']}>
          <h4>{t('disconnect')}</h4>
          <p>
            {t('disconnect desc')}
          </p>
          <button
            className={classNames('coz-btn', 'coz-btn--danger-outline', styles['coz-btn'])}
            disabled={deleting}
            aria-busy={deleting}
            onClick={onDelete}>
            {t('disconnect button')}
          </button>
        </div>
      }
      <div className={styles['coz-form-controls']}>
        { isUpdate && !isOAuth &&
          <button
            className={classNames('coz-btn', 'coz-btn--secondary', styles['coz-btn'])}
            onClick={onCancel}
          >
            {t('account.connection.update.cancel')}
          </button>
        }
        { !(isUpdate && isOAuth) &&
          <button
            className={classNames('coz-btn', 'coz-btn--regular', styles['coz-btn'])}
            disabled={submitting || !submitEnabled}
            aria-busy={submitting ? 'true' : 'false'}
            onClick={submit}
          >
            {t(isUpdate ? 'account.connection.update.save' : 'account.connection.login.submit')}
          </button>
        }
      </div>
      {error &&
        <p className='errors'>
          {t('account.connection.login.error.bad_credentials')}
        </p>
      }
    </div>
  )
}

export default statefulForm()(AccountLoginForm)