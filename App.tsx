import { PlayEvent, PlayerView, SeekEvent, SourceLoadEvent, SourceType, VideoPlaybackQualityChangedEvent, usePlayer } from 'bitmovin-player-react-native';
import { useCallback, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

function prettyPrint(header: string, obj: any) {
  console.log(header, JSON.stringify(obj, null, 2));
}

export default function App() {
  const player = usePlayer({
    remoteControlConfig: {
      isCastEnabled: false,
    },
    licenseKey: "YOUR_LICENSE_KEY",
  });

  const onEvent = useCallback((event: PlayEvent | SourceLoadEvent | SeekEvent | VideoPlaybackQualityChangedEvent) => {
    prettyPrint(`EVENT [${event.name}]`, event);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      player.load({
        url:
          Platform.OS === 'ios'
            ? 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
            : 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
        type: Platform.OS === 'ios' ? SourceType.HLS : SourceType.DASH,
        title: 'Art of Motion',
        poster:
          'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg',
        thumbnailTrack:
          'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt',
        metadata: { platform: Platform.OS },
      });

    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <PlayerView
        player={player}
        style={styles.player}
        onPlay={onEvent}
        onPlaying={onEvent}
        onPaused={onEvent}
        onReady={onEvent}
        onSourceLoaded={onEvent}
        onSeek={onEvent}
        onSeeked={onEvent}
        onStallStarted={onEvent}
        onStallEnded={onEvent}
        onVideoPlaybackQualityChanged={onEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  player: {
    flex: 1,
  },
});
