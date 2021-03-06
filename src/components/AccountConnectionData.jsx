import styles from '../styles/accountConnection'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import ReactMarkdownWrapper from '../components/ReactMarkdownWrapper'
import DataItem from '../components/DataItem'

const AccountConnectionData = ({ t, connector }) => {
  const {hasDescriptions} = connector
  const hasDataTypes = !!(connector.dataType && connector.dataType.length)

  return (
    <div className={styles['col-account-connection-data']}>
      { hasDescriptions && hasDescriptions.service &&
        <div>
          <h4>{t('account.config.data.service.description')}</h4>
          <p>
            <ReactMarkdownWrapper
              source={
                t(`connector.${connector.slug}.description.service`)
              }
            />
          </p>
        </div>
      }
      <h4>{t('account.config.data.title')}</h4>
      { hasDataTypes &&
        <ul className={styles['col-account-connection-data-access']}>
          {connector.dataType.map(data =>
            <DataItem
              dataType={data}
              hex={connector.color.hex}
            />
          )}
        </ul>}
      { !hasDataTypes &&
        <p>{t('dataType.none', {name: connector.name})}</p>}
    </div>
  )
}

export default translate()(AccountConnectionData)
