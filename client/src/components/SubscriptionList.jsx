import React, { useState, useEffect } from "react";
import {
  add_sub_to_profile,
  get_services,
  get_subscriptions,
  remove_sub_from_profile,
} from "../services/api.service";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "./AuthContext";

function SubscriptionList() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [services, setServices] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = (title, description) => {
    setModalTitle(title);
    setModalDesc(description);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const fetchServices = async () => {
    await get_services().then((response) => {
      setServices(response.data);
    });
  };

  const fetchSubscriptions = async () => {
    await get_subscriptions(user.id)
      .then((response) => {
        console.dir(response.data);
        setSubscriptions(response.data);
      })
      .catch(() => {
        console.error("Failed to fetch subscriptions:", error);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleAddSubscription = async (serviceId) => {
    let alert_status = "";

    await add_sub_to_profile(user.id, serviceId)
      .then(async () => {
        alert_status = "Subscription added successfully!";

        await get_subscriptions(user.id)
          .then((response) => {
            setSubscriptions(response.data);
          })
          .catch(() => {
            alert_status = "Failed to query subscriptions";
          });
      })
      .catch(() => {
        alert_status = "Failed to add subscription. Please try again later.";
      })
      .finally(() => {
        alert(alert_status);
      });
  };

  const handleDeleteSubscription = async (serviceId) => {
    let alert_status = "";

    await remove_sub_from_profile(user.id, serviceId)
      .then(async () => {
        alert_status = "Subscription removed successfully!";

        await get_subscriptions(user.id)
          .then((response) => {
            setSubscriptions(response.data);
          })
          .catch(() => {
            alert_status = "Failed to query subscriptions";
          });
      })
      .catch(() => {
        alert_status = "Failed to remove subscription. Please try again later.";
      })
      .finally(() => {
        alert(alert_status);
      });
  };

  const isSignedIn = () => {
    return user && "email" in user;
  };

  const isSubscribed = (service_id) => {
    return (
      subscriptions &&
      subscriptions.length > 0 &&
      subscriptions.map((s) => s.service.id).includes(service_id)
    );
  };

  return (
    <>
      <h1>Supported Subscriptions</h1>
      <div className="subscription-grid">
        {services.map((service) => (
          <Card
            className="subscription-card"
            raised
            key={service.id}
            sx={{ maxWidth: 400, px: 2, pt: 2 }}
          >
            <CardMedia
              component="img"
              height="60px"
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
              // width='60%'
              image={service.logo}
              alt="logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {service.company_name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                ${service.amount}/month
              </Typography>
            </CardContent>
            <CardActions>
              <div className="flex-auto items-center">
                <Tooltip title="More info">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleOpen(service.company_name, service.description)
                    }
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>

                {isSignedIn() && isSubscribed(service.id) && (
                  <Tooltip title="View transactions">
                    <IconButton color="secondary">
                      <ReceiptLongIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>

              {isSignedIn() && !isSubscribed(service.id) && (
                <div className="flex-auto justify-end items-center">
                  <Button
                    onClick={() => handleAddSubscription(service.id)}
                    size="small"
                  >
                    Add subscription
                  </Button>
                </div>
              )}

              {isSignedIn() && isSubscribed(service.id) && (
                <div className="flex-auto justify-end items-center">
                  <Button size="small" color="primary">
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteSubscription(service.id)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </CardActions>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {modalDesc}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default SubscriptionList;
