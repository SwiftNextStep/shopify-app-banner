import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

function install() {
  const [axios] = useAxios();
  const [isInstalled, setIsInstalled] = useState(null);
  const [scriptTagId, setScriptTagId] = useState();
  const titleDescription = isInstalled ? "Uninstall" : "Install";
  const bodyDescription = isInstalled ? "installed" : "uninstalled";

  async function fetchScriptTags() {
    const { data } = await axios.get(
      `https://il-shopify3.loca.lt/script_tag/all`
    );
    console.log("my initial script tag status: ", data);
    setIsInstalled(data.installed);
    if (data.details.length > 0) {
      setScriptTagId(data.details[0].id);
    }
  }
  useEffect(() => {
    fetchScriptTags();
  }, []);

  async function handleAction() {
    if (!isInstalled) {
      axios.post(`https://il-shopify3.loca.lt/script_tag`);
    } else {
      axios.delete(`https://il-shopify3.loca.lt/script_tag/?id=${scriptTagId}`);
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
