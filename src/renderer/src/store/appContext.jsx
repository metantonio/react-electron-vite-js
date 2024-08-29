import React, { useState, useEffect } from "react";
import getState from "./flux.jsx";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
			window.api.ipcRenderer.on('env-variables', (env) => {
				console.log('Variables de entorno recibidas:', env);
				// Aquí puedes setear el estado o realizar otras acciones
			});
			
			state.actions.init();
            // Aquí puedes hacer llamadas iniciales o manejar eventos de Electron
            window.electron.ipcRenderer.send('leído appContext');

            // Ejemplo: recibir mensajes de Electron
            window.electron.ipcRenderer.on('message-from-main', (event, data) => {
                console.log('Mensaje desde el proceso principal:', data);
            });			

            return () => {
                // Cleanup: Desuscribirse de eventos para evitar fugas de memoria
                window.electron.ipcRenderer.removeAllListeners('message-from-main');
            };
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
