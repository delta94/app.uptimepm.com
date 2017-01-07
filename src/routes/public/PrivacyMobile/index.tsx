import * as React from 'react';
import { Typography } from 'antd';
import './index.scss';
const { Title, Paragraph, Text } = Typography;

export default () => {
  return (
    <Typography style={{ width: 800, margin: 'auto' }}>
      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        MOBILE APP PRIVACY POLICY{' '}
      </Title>

      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
         INTRODUCTION
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>Last modified: September 9, 2019</Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        UptimePM, LLC (the <Text strong>“Company”</Text> or <Text strong>“We”</Text>) respects your privacy and are committed to protecting it through our
        compliance with this policy. This policy describes:
      </Paragraph>
      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>
            The types of information we may collect or that you may provide when you purchase, download, install, register with, access, or use the UptimePM
            mobile application (the <Text strong>“App”</Text>).
          </li>
          <li>Our practices for collecting, using, maintaining, protecting, and disclosing that information.</li>
        </ul>
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        This policy applies only to information we collect in this App and other electronic communications sent through or in connection with this App.
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>This policy DOES NOT apply to information that:</Paragraph>
      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>We collect offline or on any other Company apps or websites, including websites you may access through this App.</li>
          <li>You provide to or is collected by any third party (see Third-Party Information Collection).</li>
        </ul>
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        Our websites and apps, and these other third parties may have their own privacy policies, which we encourage you to read before providing information on
        or through them. Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you
        do not agree with our policies and practices, do not download, register with, or use this App. By downloading, registering with, or using this App, you
        agree to this privacy policy. This policy may change from time to time (see Changes to Our Privacy Policy). Your continued use of this App after we
        revise this policy means you accept those changes, so please check the policy periodically for updates.
      </Paragraph>
      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        CHILDREN UNDER THE AGE OF [13/16]
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        The App is not intended for children under 13 years of age, and we do not knowingly collect personal information from children under 13. If we learn we
        have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you
        believe we might have any information from or about a child under 13, please contact us at info@uptimepm.com.
      </Paragraph>
      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        INFORMATION WE COLLECT AND HOW WE COLLECT IT
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        We collect information from and about users of our App:
        <ul>
          <li>Directly from you when you provide it to us.</li>
          <li>Automatically when you use the App by way of behavioral tracking and cookies.</li>
        </ul>
      </Paragraph>
      <Title className="title" level={4} style={{ fontStyle: 'italic' }}>
        Information You Provide to Us
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>When you download, register with, or use this App, we may ask you provide information:</Paragraph>
      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>
            By which you may be personally identified, such as name, postal address, email address, telephone number, or any other information the app collects
            that is defined as personal or personally identifiable information under an applicable law (“personal information”).
          </li>
          <li>
            That is about you but individually does not identify you, such as a user name or other on-line identifier, including user names that may be assigned
            to you by your employer or other entity that has registered you as an authorized user of the App (such employer or other entity is hereinafter
            referred to as the “Registered Client”).
          </li>
          <li>
            In addition, the Registered Client’s account with us will include information regarding the Registered Client’s machinery and equipment that is
            serviced and/or maintained with the App (the “Subject Equipment”).
          </li>
        </ul>
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>This information includes:</Paragraph>
      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>
            Information that you provide by filling in forms in the App. This includes information provided at the time of registering to use the App and or by
            the Registered Client when subscribing to our service. We may also ask you for information when you report a problem with the App.
          </li>
          <li>Records and copies of your correspondence (including email addresses and phone numbers), if you contact us.</li>
          <li>Your responses to surveys that we might ask you to complete for research purposes.</li>
          <li>
            Your search queries on the App, i.e., how the user navigates the App. Information you provide on the App with respect to the Subject Equipment,
            including information you input pursuant to the App’s maintenance checklists (“Equipment Information”). Equipment Information may be associated with
            your personal information or with your username or other on-line identifier.
          </li>
        </ul>
      </Paragraph>
      <Title className="title" level={4} style={{ fontStyle: 'italic' }}>
        Automatic Information Collection and Tracking
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>When you download, access, and use the App, it may use technology to automatically collect:</Paragraph>
      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>
            <Text strong> Usage Details.</Text> When you access and use the App, we may automatically collect certain details of your access to and use of the
            App, including traffic data, logs, and other communication data and the resources that you access and use on or through the App.
          </li>
          <li>
            <Text strong> Device Information.</Text> We may collect information about your mobile device and internet connection, including the device’s unique
            device identifier, IP address, operating system, browser type, mobile network information, and the device’s telephone number.
          </li>
          <li>
            <Text strong> Stored Information and Files.</Text> The App also may access metadata and other information associated with other files stored on your
            device. This may include, for example, photographs, audio and video clips contained on your mobile device.
          </li>
        </ul>
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        If you do not want us to collect this information do not download the App or delete it from your device. You may opt out at any time by terminating the
        Mobile Application End User Agreement (the “EULA”). For more information, see [LINK TO CHOICES ABOUT HOW WE USE AND DISCLOSE YOUR INFORMATION].
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        We also may use these technologies to collect information about your activities over time and across third-party websites, apps, or other online
        services (behavioral tracking).
      </Paragraph>
      <Title className="title" level={4} style={{ fontStyle: 'italic' }}>
        Information Collection and Tracking Technologies
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>The technologies we use for automatic information collection may include:</Paragraph>

      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>
            <Text strong>Cookies (or mobile cookies).</Text> A cookie is a small file placed on your smartphone. It may be possible to refuse to accept mobile
            cookies by activating the appropriate setting on your smartphone. However, if you select this setting you may be unable to access certain parts of
            our App.
          </li>
          <li>
            <Text strong> Web Beacons.</Text> Pages of the App and our emails may contain small electronic files known as web beacons (also referred to as clear
            gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and
            for other related app statistics (for example, recording the popularity of certain app content and verifying system and server integrity).
          </li>
        </ul>
      </Paragraph>

      <Title className="title" level={4} style={{ fontStyle: 'italic' }}>
        Third-Party Information Collection
      </Title>

      <Paragraph style={{ paddingLeft: 50 }}>
        When you use the App or its content, certain third parties may use automatic information collection technologies to collect information about you or
        your device. These third parties may include:
      </Paragraph>

      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>Analytics companies.</li>
          <li>Your mobile device make.</li>
          <li>Your mobile service provider.</li>
        </ul>
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        These third parties may use tracking technologies to collect information about you when you use this App. The information they collect may be associated
        with your personal information or they may collect information, including personal information, about your online activities over time and across
        different websites, apps, and other online services websites. They may use this information to provide you with interest-based (behavioral) advertising
        or other targeted content. We do not control these third parties’ tracking technologies or how they may be used. If you have any questions about an
        advertisement or other targeted content, you should contact the responsible provider directly.
      </Paragraph>

      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        HOW WE USE YOUR INFORMATION
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        We use information that we collect about you or that you provide to us, including any personal information, to:
      </Paragraph>

      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>Provide you with the App and its contents, and any other information, products or services that you or the Registered Client request from us.</li>
          <li>Fulfill any other purpose for which you or the Registered Client provide it.</li>
          <li>Give you notices about your subscription, including expiration and renewal notices.</li>
          <li>
            Carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.
          </li>
          <li>Notify you when App updates are available, and of changes to any products or services we offer or provide though it.</li>
        </ul>
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        The usage information we collect helps us to improve our App and to deliver a better and more personalized experience by enabling us to:
      </Paragraph>

      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>Estimate our audience size and usage patterns.</li>
          <li>Store information about your preferences, allowing us to customize our App according to your individual interests.</li>
          <li>Recognize you when you use the App.</li>
        </ul>
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        We may also use your information to contact you about our own goods and services that may be of interest to you. We will not contact your regarding
        third parties’ goods and services, however. For more information, see Your Choices About Our Collection, Use, and Disclosure of Your Information. Please
        note that at this time we do not display advertisements to advertisers and will not use your personal information for this purpose.
      </Paragraph>

      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        DISCLOSURE OF YOUR INFORMATION
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        We may disclose aggregated information about our users, and information that does not identify any individual or device, without restriction.
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>In addition, we may disclose personal information that we collect, or you provide:</Paragraph>

      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>To our subsidiaries and affiliates.</li>
          <li>
            To contractors, service providers, and other third parties we use to support our business and who are bound by contractual obligations to keep
            personal information confidential and use it only for the purposes for which we disclose it to them.
          </li>
          <li>
            To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some
            or all of UptimePM, LLC’s assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal
            information held by UptimePM, LLC about our App users is among the assets transferred.
          </li>

          <li>To fulfill the purpose for which you provide it.</li>
          <li>For any other purpose disclosed by us when you provide the information.</li>
          <li>With your consent.</li>
          <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
          <li>
            To enforce our rights arising from any contracts entered into between you and us, including the EULA, terms of subscription, and for billing and
            collection.
          </li>
        </ul>
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of UptimePM, LLC, our customers or others. This includes
        exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.
      </Paragraph>

      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        YOUR CHOICES ABOUT OUR COLLECTION, USE, AND DISCLOSURE OF YOUR INFORMATION
      </Title>

      <Paragraph style={{ paddingLeft: 50 }}>
        We strive to provide you with choices regarding the personal information you provide to us. This section describes mechanisms we provide for you to
        control certain uses and disclosures of over your information.
      </Paragraph>

      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>
            <b>Tracking Technologies.</b> You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you
            disable or refuse cookies or block the use of other stored files, some parts of the App may then be inaccessible or not function properly.
          </li>
        </ul>
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        We do not control third parties’ collection or use of your information to serve interest-based advertising. However, these third parties may provide you
        with ways to choose not to have your information collected or used in this way.
      </Paragraph>

      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        ACCESSING AND CORRECTING YOUR PERSONAL INFORMATION
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        You can review and change your personal information by logging into the App and visiting your account profile page. You may also send us an email at
        support@uptimepm.com to request access to, correct, or delete any personal information that you have provided to us. We cannot delete your personal
        information except by also deleting your user account. We may not accommodate a request to change information if we believe the change would violate any
        law or legal requirement or cause the information to be incorrect.
      </Paragraph>

      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        DATA SECURITY
      </Title>

      <Paragraph style={{ paddingLeft: 50 }}>
        We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and
        disclosure. All information you provide to us is stored on our secure servers behind firewalls.
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain
        parts of our App, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        Unfortunately, the transmission of information via the internet and mobile platforms is not completely secure. Although we do our best to protect your
        personal information, we cannot guarantee the security of your personal information transmitted through our App. Any transmission of personal
        information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures we provide.
      </Paragraph>

      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        CHANGES TO OUR PRIVACY POLICY
      </Title>

      <Paragraph style={{ paddingLeft: 50 }}>
        We may update our privacy policy from time to time. If we make material changes to how we treat our users’ personal information, we will post the new
        privacy policy on this page with a notice that the privacy policy has been updated.
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        The date the privacy policy was last revised is identified at the top of the page. You are responsible for periodically visiting this privacy policy to
        check for any changes.
      </Paragraph>

      <Title className="title" level={2} style={{ textDecoration: 'underline' }}>
        CONTACT INFORMATION
      </Title>

      <Paragraph style={{ paddingLeft: 50 }}>
        To ask questions or comment about this privacy policy and our privacy practices, contact us at:{' '}
        <a href="mailto:support@uptimepm.com"> support@uptimepm.com</a>
      </Paragraph>
    </Typography>
  );
};
