PARAMETERS=$(cat << EOF
{
    "survey": "$1"
}
EOF
)


curl -X POST "https://studio.twilio.com/v2/Flows/$AIRTABLE_FLOW_SID/Executions" \
-d Parameters="$PARAMETERS" \
-d To="$SAMPLE_TO_NUMBER" \
-d From="$TWILIO_PHONE_NUMBER" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN



