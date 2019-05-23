const OSS = require('ali-oss')

const accessKeyId = 'LTAIcJ2c4DfxlC90'
const accessKeySecret = 'e4AnZMeLZlKvuKuJOSs2Rrk2JzofFw'
const region = 'oss-ap-southeast-2'

// image
const imageEndPoint = 'image.suavechat.com'
const imageBucket = 'suave-image'
// audio
const audioEndPoint = 'audio.suavechat.com'
const audioBucket = 'suave-audio'

export function getImageURL(name) {
  const client = new OSS({
    endpoint: imageEndPoint,
    bucket: imageBucket,
    region,
    accessKeyId,
    accessKeySecret,
    cname: true
  })
  return client.signatureUrl(name)
}

export function getAudioURL(name) {
  const client = new OSS({
    endpoint: audioEndPoint,
    bucket: audioBucket,
    region,
    accessKeyId,
    accessKeySecret,
    cname: true
  })
  return client.signatureUrl(name)
}
