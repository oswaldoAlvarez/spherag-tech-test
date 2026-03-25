import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'Spherag',
})
  .useReactNative({
    asyncStorage: false,
    devTools: false,
    editor: false,
    networking: {
      ignoreUrls: /symbolicate|logs/i,
    },
    overlay: false,
    storybook: false,
  })
  .connect();
