import { app, BrowserWindow, ipcMain } from 'electron';
import { format as formatUrl } from 'url';
import { join as joinPath } from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
		},
	});

    mainWindow.webContents.openDevTools({
        mode: 'detach',
    });

    if (isDevelopment) {
		mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}?version=DEV&view=app`);
	} else {
		mainWindow.loadURL(
			formatUrl({
				pathname: joinPath(__dirname, 'index.html'),
				protocol: 'file',
				query: {
					version: 'DEV',
					view: 'app',
				},
				slashes: true,
			})
		);
	}

    mainWindow.on('closed', () => {
		try {
			mainWindow?.destroy();
		} catch {
			/* empty */
		}
	});
}

app.on('ready', () => {
    createWindow()
});

ipcMain.on('quit-app', () => {
    app.quit()
})