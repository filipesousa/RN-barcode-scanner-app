import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';

type Props = {
  onQrCodeRead: (qrCode: string) => void;
  children?: React.ReactNode;
};

/**
 * This generic component scans any QR code and returns the result.
 * @param param0
 * @returns
 */
const App = ({ onQrCodeRead, children }: Props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  console.log('devices', !!device)

  return (
      <View style={styles.container}>
        {device && (
          <Camera
          frameProcessor={frameProcessor}
            device={device}
            isActive={true}
            frameProcessorFps={5}
            style={styles.preview}
          />
        )}
        <Text>Barcodes: {JSON.stringify(barcodes && barcodes.length> 0 && barcodes[0].displayValue, undefined,2)}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    border: 3,
    borderColor: 'red',
    backgroundColor: 'green',
  },
  preview: {
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default App;
