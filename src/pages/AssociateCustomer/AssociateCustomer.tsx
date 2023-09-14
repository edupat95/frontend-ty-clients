import React, { useState } from 'react';
import CabeceraComponent from '../../components/CabeceraComponent';
import MenuButtonsComponent from './components/MenuButtonsComponent';
import GenerateIdentifierAssociationView from './pages/GenerateIdentifierAssociation/GenerateIdentifierAssociationView';
import LinkIdentifierToDocumento from './pages/LinkIdentifierToDocumento/LinkIdentifierToDocumentoView';


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
          <LinkIdentifierToDocumento />
        )}
      </div>
    </div>
  )
  
}

export default AssociateCustomer;