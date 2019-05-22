const OSS = require('ali-oss')

export function getImageURL(name) {
  const client = new OSS({
    endpoint: 'image.suavechat.com',
    region: 'oss-ap-southeast-2',
    accessKeyId: 'LTAIcJ2c4DfxlC90',
    accessKeySecret: 'e4AnZMeLZlKvuKuJOSs2Rrk2JzofFw',
    bucket: 'suave-image',
    cname: true
  })
  return client.signatureUrl(name)
}
