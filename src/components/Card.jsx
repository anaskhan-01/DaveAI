import { Box, Card, CardContent, Typography } from "@mui/material";
const CardUI = ({ data }) => {
  return (
    <Card
      sx={{
        width: "360px",
        textAlign: "left",
        minHeight: "400px",
        background: "linear-gradient(135deg, #c3ec52 0%,#0ba29d 100%)",
        color: "#fff",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-around",
        }}
      >
        <Typography>
          <strong>Cateogory:</strong> {data?.category}
        </Typography>
        <Typography>
          <strong>Channel:</strong> {data?.channel}
        </Typography>
        <Typography>
          <strong>Request Description:</strong> {data?.request_description}
        </Typography>
        <Typography>
          <strong>Contact Number:</strong> {data?.contact_numbers}
        </Typography>
        <Typography>
          <strong>State:</strong> {data.state || "NA"}
        </Typography>
        <Typography>
          <strong>District:</strong> {data.district || "NA"}
        </Typography>
        <Typography>
          <strong>Source Time:</strong> {data?.source_time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardUI;
// {
//   "state": "delhi", 5
//   "valid": true,
//   "channel": "twitter", 2
//   "created": "2021-05-14 10:00:39 AM +0000",
//   "updated": "2021-05-14 10:46:41 AM +0000",
//   "category": "Oxygen", 1
//   "district": "", 6
//   "up_votes": 0.0,
//   "source_id": "609e47c80741ce0034df585a",
//   "down_votes": 0.0,
//   "source_time": "2021-05-14 09:45:46 AM +0000", 7
//   "contact_numbers": [
//       "7703837172" 4
//   ],
//   "validation_method": "automatic",
//   "request_description": "Oxygen refilling available in Delhi  Contact-7703837172 (whatsapp) -closes at 6pm  Verified " 3
// },
