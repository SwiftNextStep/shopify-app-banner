import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import React, { useState } from "react";
import Axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
function install() {
  const instance = Axios.create();
  instance.interceptors.request.use(function (config) {
    return getSessionToken(window.app).then((token) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  });
  const [isInstalled, setIsInstalled] = useState(null);
  const titleDescription = isInstalled ? "Uninstall" : "Install";
  const bodyDescription = isInstalled ? "installed" : "uninstalled";
  async function handleAction() {
    if (!isInstalled) {
      try {
        const response = instance.post("https://il-shopify.loca.lt/script_tag");
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    setIsInstalled((oldValue) => !oldValue);
  }
  return (
    <Page>
      <Layout.AnnotatedSection
        title={`${titleDescription} banner`}
        description="Toggle banner installation on your shop"
      >
        <SettingToggle
          action={{
            content: titleDescription,
            onAction: handleAction,
          }}
          enabled={true}
        >
          The banner script is{" "}
          <TextStyle variation="strong">{bodyDescription}</TextStyle>
        </SettingToggle>
      </Layout.AnnotatedSection>
    </Page>
  );
}

export default install;
