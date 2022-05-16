Aws.config.update({
    region: 'ap-northeast-1',
    credentials: Aws::Credentials.new(ENV['AWS_ID'], ENV['AWS_PASSWORD']),
  })
  
S3_BUCKET = Aws::S3::Resource.new.bucket(ENV['S3_BUCKET'])