#!/bin/bash

set -e
export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-eu-central-1}
export STACK_NAME=${STACK_NAME:-ssg-demo}

dir=$(pwd)

[ -d dist ] && rm -r dist
[ -d node_modules ] || npm ci --omit=dev --no-audit
npm run build

aws cloudformation deploy \
    --stack-name=$STACK_NAME \
    --template-file=cloudformation.yml \
    --capabilities CAPABILITY_IAM \
    --no-fail-on-empty-changeset

bucketName=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`bucketName`].OutputValue' --output text)
cftDist=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`cftDist`].OutputValue' --output text)
cftDomain=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`cftDomain`].OutputValue' --output text)

aws s3 cp dist/ s3://$bucketName/ --recursive --cache-control max-age=60
aws cloudfront create-invalidation --distribution-id $cftDist --paths "/*"

echo "Done, deployed at https://$cftDomain"
