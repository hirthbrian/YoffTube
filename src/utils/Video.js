import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

export const mapVideoFromApi = (video) => ({
  id: video.id,
  title: video.snippet.title,
  duration: moment.duration(video.contentDetails.duration).format('h:mm:ss'),
  views: video.statistics.viewCount,
  thumbnail: video.snippet.thumbnails.high.url,
  date: video.snippet.publishedAt,
  channelId: video.snippet.channelId,
  channelTitle: video.snippet.channelTitle
})