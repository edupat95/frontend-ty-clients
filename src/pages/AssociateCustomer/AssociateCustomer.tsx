import React, { useState } from 'react';
import CabeceraComponent from '../../components/CabeceraComponent';
import MenuButtonsComponent from './components/MenuButtonsComponent';
import GenerateIdentifierAssociationView from './pages/GenerateIdentifierAssociation/GenerateIdentifierAssociationView';


export const AssociateCustomer = () => {
  const [generateIdentifierAssociationVew, setGenerateIdentifierAssociationVewState] = useState(false);
  const [linkIdentifierToDocumentoView, setLinkIdentifierToDocumentoViewState] = useState(false);
  return (
    <div>
      <CabeceraComponent />
      <MenuButtonsComponent
        setGenerateIdentifierAssociationVewState = {setGenerateIdentifierAssociationVewState}
        setLinkIdentifierToDocumentoViewState = {setLinkIdentifierToDocumentoViewState}
      />
      <div>
        {generateIdentifierAssociationVew && (
          <GenerateIdentifierAssociationView />
        )} 
        {linkIdentifierToDocumentoView && (
          <div>
            Linkear con tarjeta
          </div> 
          )}
      </div>
    </div>
  )
  
}

export default AssociateCustomer;