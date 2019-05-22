const OSS = require('ali-oss')

export function getImageURL(name) {
  const client = new OSS({
    endpoint: 'image.suavechat.com',
    bucket: 'suave-image',
    region: 'oss-ap-southeast-2',
    accessKeyId: 'LTAIcJ2c4DfxlC90',
    accessKeySecret: 'e4AnZMeLZlKvuKuJOSs2Rrk2JzofFw',
    cname: true
  })
  return client.signatureUrl(name)
}

export function getAudioURL(name) {
  const client = new OSS({
    endpoint: 'audio.suavechat.com',
    bucket: 'suave-audio',
    region: 'oss-ap-southeast-2',
    accessKeyId: 'LTAIcJ2c4DfxlC90',
    accessKeySecret: 'e4AnZMeLZlKvuKuJOSs2Rrk2JzofFw',
    cname: true
  })
  return client.signatureUrl(name)
}
