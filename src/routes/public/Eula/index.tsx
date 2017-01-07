import * as React from 'react';
import { Typography, Divider } from 'antd';
import './index.scss';
const { Title, Paragraph, Text } = Typography;

export default () => {
  return (
    <Typography style={{ width: 800, margin: 'auto' }}>
      <Title level={2}>MOBILE APPLICATION END USER LICENSE AGREEMENT</Title>
      <Paragraph>
        This Mobile Application End User License Agreement (the <Text strong>“Agreement”</Text>) is a binding agreement between you (the{' '}
        <Text strong>“End User”</Text> and, at times referred to as
        <Text strong>“you”</Text>) and UptimePM, LLC, a Wyoming limited liability company (the <Text strong>“Company”</Text>). This Agreement governs your use
        of the, (including all related documentation, the <Text strong>“Application”</Text>). The Application is licensed, not sold, to you.
      </Paragraph>

      <Paragraph>
        BY CLICKING THE “AGREE” BUTTON, YOU (A) ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND THIS AGREEMENT; (B) REPRESENT THAT YOU ARE 18 YEARS OF AGE OR
        OLDER; (C) AGREE THAT YOU WILL NOT USE THE APPLICATION IN AN UNSAFE MANNER (INCLUDING, BUT NOT LIMITED TO THOSE LISTED IN{' '}
        <Text strong>SECTION 2(G))</Text> AND SHALL COMPLY WITH ALL STATE AND FEDERAL SAFETY REGULATIONS; AND (D) ACCEPT THIS AGREEMENT AND AGREE THAT YOU ARE
        LEGALLY BOUND BY ITS TERMS; AND (D) YOU . IF YOU DO NOT AGREE TO THESE TERMS, DO NOT DOWNLOAD THE APPLICATION AND DELETE IT FROM YOUR MOBILE DEVICE.
      </Paragraph>

      <Paragraph strong>
        WHEN USING THE APPLICATION, BE AWARE OF YOUR SURROUNDINGS AT ALL TIME AND ONLY UTILIZE THE APPLICATION IN A SAFE MANNER AND IN COMPLIANCE WITH ALL
        REGULATIONS ISSUED BY THE OCCUPATIONAL SAFETY AND HEALTH ADMINISTRATION (“OSHA”) AND ANY OTHER APPLICABLE LAWS, RULES OR REGULATIONS AS WELL AS THE
        SAFETY POLICIES AND PROCEDURES OF YOUR REGISTERED CLIENT (AS HEREINAFTER DEFINED). YOU AGREE THAT YOUR USE OF THE APPLICATION IS AT YOUR OWN RISK AND IT
        IS YOUR RESPONSIBILITY TO MAINTAIN SUCH HEALTH, LIABILITY, HAZARD, PERSONAL INJURY, MEDICAL, LIFE AND OTHER INSURANCE POLICIES AS YOU DEEM REASONABLY
        NECESSARY FOR ANY INJURIES THAT YOU MAY INCUR WHILE USING THE SERVICES. YOU AGREE NOT TO ENCOURAGE OR ENABLE ANY OTHER INDIVIDUAL TO VIOLATE ANY OSHA
        REGULATION OR OTHER APPLICABLE LAW, RULE OR REGULATION OR ANY REGISTERED CLIENT’S SAFETY POLICIES OR PROCEDURES. YOU AGREE THAT YOU WILL NOT ENTER ONTO
        PRIVATE PROPERTY WITHOUT PERMISSION, WILL NOT IMPERSONATE ANY OTHER PERSON OR MISREPRESENT YOUR AFFILIATE, TITLE OR AUTHORITY, AND WILL NOT OTHERWISE
        ENGAGE IN ANY ACTIVITY THAT MAY RESULT IN INJURY, DEATH, PROPERTY DAMAGE AND/OR LIABILITY OF ANY KIND.
      </Paragraph>

      <Title level={3}>
        1.  <span style={{ textDecoration: 'underline' }}>License Grant.</span> Subject to the terms of this Agreement, Company grants you a limited,
        non-exclusive, and nontransferable license to:
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        (a) download, install, and use the Application in furtherance of your relevant business purposes, on a single mobile device owned or otherwise
        controlled by you <Text strong>(“Mobile Device”)</Text> strictly in accordance with the Application’s documentation; and
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        (b) access, stream, download, and use on such Mobile Device the Content and Services (as defined in Section 5) made available in or otherwise accessible
        through the Application, strictly in accordance with this Agreement and the Terms of Use applicable to such Content and Services as set forth in Section
      </Paragraph>

      <Title level={3}>
        2.  <span style={{ textDecoration: 'underline' }}>License Restrictions.</span> Licensee shall not:
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>(a)  copy the Application, except as expressly permitted by this license;</Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        (b)  modify, translate, adapt, or otherwise create derivative works or improvements, whether or not patentable, of the Application;
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        (c)  reverse engineer, disassemble, decompile, decode, or otherwise attempt to derive or gain access to the source code of the Application or any part
        thereof;
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        (d)  remove, delete, alter, or obscure any trademarks or any copyright, trademark, patent, or other intellectual property or proprietary rights notices
        from the Application, including any copy thereof;
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        (e)  rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer, or otherwise make available the Application, or any features or
        functionality of the Application, to any third party for any reason, including by making the Application available on a network where it is capable of
        being accessed by more than one device at any time; or
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50 }}>
        (f)  remove, disable, circumvent, or otherwise create or implement any workaround to any copy protection, rights management, or security features in or
        protecting the Application; or
      </Paragraph>

      <Paragraph style={{ paddingLeft: 50, backgroundColor: 'yellow' }}>
        (g)  use the Application in, or in association with, the design, construction, maintenance, or operation of any hazardous environments or systems,
        including any power generation systems; aircraft navigation or communication systems, air traffic control systems, or any other transport management
        systems; safety-critical applications, including medical or life-support systems, vehicle operation applications or any police, fire, or other safety
        response systems; and military or aerospace applications, weapons systems, or environments.
      </Paragraph>

      <Title level={3}>
        3.  <span style={{ textDecoration: 'underline' }}>Reservation of Rights. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        You acknowledge and agree that the Application is provided under license, and not sold, to you. You do not acquire any ownership interest in the
        Application under this Agreement, or any other rights thereto other than to use the Application in accordance with the license granted, and subject to
        all terms, conditions, and restrictions, under this Agreement. Company reserves and shall retain its entire right, title, and interest in and to the
        Application, including all copyrights, trademarks, and other intellectual property rights therein or relating thereto, except as expressly granted to
        you in this Agreement.{' '}
      </Paragraph>

      <Title level={3}>
        4.  <span style={{ textDecoration: 'underline' }}>Collection and Use of Your Information. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        You acknowledge that when you download, install, or use the Application, Company may use automatic means (including, for example, by way of behavioral
        tracking, cookies and web beacons) to collect information about your Mobile 4.  Collection and Use of Your Information. You acknowledge that when you
        download, install, or use the Application, Company may use automatic means (including, for example, by way of behavioral tracking, cookies and web
        beacons) to collect information about your Mobile Device and about your use of the Application. You also may be required to provide certain information
        about yourself as a condition to downloading, installing, or using the Application or certain of its features or functionality. All information we
        collect through or in connection with this Application is subject to our <a href="/privacy">Privacy Policy</a>. By downloading, installing, using, and
        providing information to or through this Application, you consent to all actions taken by us with respect to your information in compliance with the
        Privacy Policy.
      </Paragraph>

      <Title level={3}>
        5.  <span style={{ textDecoration: 'underline' }}>Content and Services. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        The Application may provide you with access to Company’s website located at <a href="https://www.uptimepm.com">www.uptimepm.com</a> and{' '}
        <a href="https://app.uptimepm.com">app.uptimepm.com</a> (the <Text strong>“Website”</Text>) and products and services accessible thereon, and certain
        features, functionality, and content accessible on or through the Application may be hosted on the Website (collectively,{' '}
        <Text strong>“Content and Services”</Text>). Your access to and use of such Content and Services are governed by Website’s Terms of Use and Privacy
        Policy located at <a href="/terms">terms</a> and <a href="/privacy">privacy</a>, which are incorporated herein by this reference. Your access to and use
        of such Content and Services may require you to acknowledge your acceptance of such Terms of Use and Privacy Policy and/or to register with the Website,
        and your failure to do so may restrict you from accessing or using certain of the Application’s features and functionality. This Application is designed
        to assist with the maintenance and servicing of certain machinery and equipment (the <Text strong>“Subject Equipment”</Text>). When registering with the
        Website, you or the owner or licensee of the Subject Equipment (which may be your employer or client) (the <Text strong>“Registered Client”</Text>)
        shall register the Subject Equipment with the Website and the Applicable through an onboarding process. This onboarding process may include the
        preparation and uploading of checklists, service guidelines and related materials (the
        <Text strong> “Client Content”</Text>). Once the onboarding process is complete, the End User will be granted login credentials for the Application i.e.
        a username and password. The onboarding process and your subsequent use of the Application and any Client Content is subject to the Terms of Use, and
        any violation thereof will be deemed a violation of this Agreement.
      </Paragraph>

      <Title level={3}>
        6.  <span style={{ textDecoration: 'underline' }}>Geographic Restrictions. </span>
      </Title>

      <Paragraph style={{ paddingLeft: 50 }}>
        The Content and Services are based in the United States and provided for access and use only by persons located in the United States. You acknowledge
        that you may not be able to access all or some of the Content and Services outside of the United States and that access thereto may not be legal by
        certain persons or in certain countries. If you access the Content and Services from outside the United States, you are responsible for compliance with
        local laws.
      </Paragraph>

      <Title level={3}>
        7.  <span style={{ textDecoration: 'underline' }}>Updates. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        Company may from time to time in its sole discretion develop and provide Application updates, which may include upgrades, bug fixes, patches, other
        error corrections, and/or new features (collectively, including related documentation,<Text strong> “Updates”</Text>). Updates may also modify or delete
        in their entirety certain features and functionality. You agree that Company has no obligation to provide any Updates or to continue to provide or
        enable any particular features or functionality. Based on your Mobile Device settings, when your Mobile Device is connected to the internet either:
      </Paragraph>

      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>(a)  the Application will automatically download and install all available Updates; or</li>
          <li>(b)  you may receive notice of or be prompted to download and install available Updates.</li>
        </ul>
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        You shall promptly download and install all Updates and acknowledge and agree that the Application or portions thereof may not properly operate should
        you fail to do so. You further agree that all Updates will be deemed part of the Application and be subject to all terms and conditions of this
        Agreement.
      </Paragraph>

      <Title level={3}>
        8.  <span style={{ textDecoration: 'underline' }}>Term and Termination. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>
            (a)  The term of this Agreement commences when you download the Application and will continue in effect until terminated by you or Company as set
            forth in this Section 8.
          </li>
          <li>(b)  You may terminate this Agreement by deleting the Application and all copies thereof from your Mobile Device.</li>
          <li>
            (c)  Company may terminate this Agreement at any time without notice. In addition, this Agreement will terminate immediately and automatically
            without any notice if you violate any of the terms and conditions of this Agreement.
          </li>

          <li>(d)  Upon termination:</li>
          <li style={{ paddingLeft: 50 }}>(i)  all rights granted to you under this Agreement will also terminate; and</li>
          <li style={{ paddingLeft: 50 }}>
            (ii)  you must cease all use of the Application and delete all copies of the Application from your Mobile Device and account.
          </li>

          <li>(e)  Termination will not limit any of Company’s rights or remedies at law or in equity.</li>
        </ul>
      </Paragraph>
      <Title level={3}>
        9.  <span style={{ textDecoration: 'underline' }}>Disclaimer of Warranties. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        THE APPLICATION IS PROVIDED TO LICENSEE “AS IS” AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER
        APPLICABLE LAW, COMPANY, ON ITS OWN BEHALF AND ON BEHALF OF ITS AFFILIATES AND ITS AND THEIR RESPECTIVE LICENSORS AND SERVICE PROVIDERS, EXPRESSLY
        DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, WITH RESPECT TO THE APPLICATION, INCLUDING ALL IMPLIED WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND WARRANTIES THAT MAY ARISE OUT OF COURSE OF DEALING, COURSE OF
        PERFORMANCE, USAGE, OR TRADE PRACTICE. WITHOUT LIMITATION TO THE FOREGOING, COMPANY PROVIDES NO WARRANTY OR UNDERTAKING, AND MAKES NO REPRESENTATION OF
        ANY KIND THAT THE APPLICATION WILL MEET YOUR REQUIREMENTS, ACHIEVE ANY INTENDED RESULTS, BE COMPATIBLE, OR WORK WITH ANY OTHER SOFTWARE, APPLICATIONS,
        SYSTEMS, OR SERVICES, OPERATE WITHOUT INTERRUPTION, MEET ANY PERFORMANCE OR RELIABILITY STANDARDS, OR BE ERROR-FREE, OR THAT ANY ERRORS OR DEFECTS CAN
        OR WILL BE CORRECTED.   SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF OR LIMITATIONS ON IMPLIED WARRANTIES OR THE LIMITATIONS ON THE APPLICABLE
        STATUTORY RIGHTS OF A CONSUMER, SO SOME OR ALL OF THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.
      </Paragraph>

      <Title level={3}>
        10.  <span style={{ textDecoration: 'underline' }}>Limitation of Liability. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL COMPANY OR ITS AFFILIATES, OR ANY OF ITS OR THEIR RESPECTIVE LICENSORS OR SERVICE
        PROVIDERS, HAVE ANY LIABILITY ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE APPLICATION OR THE CONTENT AND SERVICES FOR:
      </Paragraph>
      <Paragraph style={{ paddingLeft: 100 }}>
        <ul>
          <li>
            (a)  PERSONAL INJURY, PROPERTY DAMAGE, LOST PROFITS, COST OF SUBSTITUTE GOODS OR SERVICES, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION,
            COMPUTER FAILURE OR MALFUNCTION, OR ANY OTHER CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, OR PUNITIVE DAMAGES.
          </li>
          <li>(b)  DIRECT DAMAGES IN AMOUNTS THAT IN THE AGGREGATE EXCEED THE AMOUNT ACTUALLY PAID BY YOU FOR THE APPLICATION.</li>
        </ul>
      </Paragraph>
      <Paragraph style={{ paddingLeft: 50 }}>
        THE FOREGOING LIMITATIONS WILL APPLY WHETHER SUCH DAMAGES ARISE OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE AND REGARDLESS OF
        WHETHER SUCH DAMAGES WERE FORESEEABLE OR COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS OF
        LIABILITY SO SOME OR ALL OF THE ABOVE LIMITATIONS OF LIABILITY MAY NOT APPLY TO YOU.
      </Paragraph>

      <Title level={3}>
        11.  <span style={{ textDecoration: 'underline' }}>Indemnification. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        You agree to indemnify, defend, and hold harmless Company and its officers, directors, employees, agents, affiliates, successors, and assigns from and
        against any and all losses, damages, liabilities, deficiencies, claims, actions, judgments, settlements, interest, awards, penalties, fines, costs, or
        expenses of whatever kind, including reasonable attorneys’ fees, arising from or relating to your use or misuse of the Application or your breach of
        this Agreement, including but not limited to the content you submit or make available through this Application.
      </Paragraph>

      <Title level={3}>
        12.  <span style={{ textDecoration: 'underline' }}>Export Regulation. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        The Application may be subject to US export control laws, including the Export Control Reform Act and its associated regulations. You shall not,
        directly or indirectly, export, re-export, or release the Application to, or make the Application accessible from, any jurisdiction or country to which
        export, re-export, or release is prohibited by law, rule, or regulation. You shall comply with all applicable federal laws, regulations, and rules, and
        complete all required undertakings (including obtaining any necessary export license or other governmental approval), prior to exporting, re-exporting,
        releasing, or otherwise making the Application available outside the US.
      </Paragraph>

      <Title level={3}>
        13.  <span style={{ textDecoration: 'underline' }}>US Government Rights. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        The Application is commercial computer software, as such term is defined in 48 C.F.R. §2.101. Accordingly, if you are an agency of the US Government or
        any contractor therefor, you receive only those rights with respect to the Application as are granted to all other end users under license, in
        accordance with (a) 48 C.F.R. §227.7201 through 48 C.F.R. §227.7204, with respect to the Department of Defense and their contractors, or (b) 48 C.F.R.
        §12.212, with respect to all other US Government licensees and their contractors.
      </Paragraph>

      <Title level={3}>
        14.  <span style={{ textDecoration: 'underline' }}>Severability. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        If any provision of this Agreement is illegal or unenforceable under applicable law, the remainder of the provision will be amended to achieve as
        closely as possible the effect of the original term and all other provisions of this Agreement will continue in full force and effect.
      </Paragraph>

      <Title level={3}>
        15.  <span style={{ textDecoration: 'underline' }}>Governing Law. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        This Agreement is governed by and construed in accordance with the internal laws of the State of Wyoming without giving effect to any choice or conflict
        of law provision or rule. Any legal suit, action, or proceeding arising out of or related to this Agreement or the Application shall be instituted
        exclusively in the federal courts of the United States or the courts of the State of Georgia in each case located in Fulton County. You waive any and
        all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
      </Paragraph>

      <Title level={3}>
        16.  <span style={{ textDecoration: 'underline' }}>Limitation of Time to File Claims. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE APPLICATION MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER
        THE CAUSE OF ACTION ACCRUES OTHERWISE SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
      </Paragraph>

      <Title level={3}>
        17.  <span style={{ textDecoration: 'underline' }}>Entire Agreement. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        This Agreement, the Website’s Terms of Use, the Website Privacy Policy, and our Mobile Application Privacy Policy constitute the entire agreement
        between you and Company with respect to the Application and supersede all prior or contemporaneous understandings and agreements, whether written or
        oral, with respect to the Application.
      </Paragraph>

      <Title level={3}>
        18.  <span style={{ textDecoration: 'underline' }}>Waiver. </span>
      </Title>
      <Paragraph style={{ paddingLeft: 50 }}>
        No failure to exercise, and no delay in exercising, on the part of either party, any right or any power hereunder shall operate as a waiver thereof, nor
        shall any single or partial exercise of any right or power hereunder preclude further exercise of that or any other right hereunder. In the event of a
        conflict between this Agreement and any applicable purchase or other terms, the terms of this Agreement shall govern.
      </Paragraph>

      <Divider />
    </Typography>
  );
};
